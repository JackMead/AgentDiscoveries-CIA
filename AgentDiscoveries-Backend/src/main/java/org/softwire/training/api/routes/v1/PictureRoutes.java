package org.softwire.training.api.routes.v1;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.softwire.training.api.models.ErrorCode;
import org.softwire.training.api.models.FailedRequestException;
import org.softwire.training.api.models.PictureApiModel;
import org.softwire.training.db.daos.PicturesDao;
import org.softwire.training.db.daos.UsersDao;
import spark.Request;
import spark.Response;

import javax.inject.Inject;
import javax.servlet.MultipartConfigElement;
import javax.servlet.ServletException;
import javax.servlet.http.Part;
import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.util.Optional;

public class PictureRoutes {
    private final UsersDao usersDao;
    private final PicturesDao picturesDao;

    @Inject
    public PictureRoutes(PicturesDao picturesDao, UsersDao usersDao) {
        this.picturesDao = picturesDao;
        this.usersDao = usersDao;
    }

    public PictureApiModel updatePicture(Request req, Response res, int id) throws FailedRequestException, IOException, ServletException {
        int userId = req.attribute("user_id");
        if (userId != id && userId != 0) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "userId cannot be specified differently to URI");
        }

        req.raw().setAttribute("org.eclipse.jetty.multipartConfig", new MultipartConfigElement("/default"));
        Part filePart = req.raw().getPart("file");
        String fileName = filePart.getSubmittedFileName();
        String extension = "";
        byte[] contents = null;
        if(filePart.getSize()>1024*1024){
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "picture is larger than 1MB");
        }

        try (final InputStream in = filePart.getInputStream()) {
            extension = fileName.substring(fileName.lastIndexOf(".") + 1);
            contents= IOUtils.toByteArray(in);
            Blob blob = new SerialBlob(contents);
            picturesDao.createOrUpdateUserPicture(userId, blob, extension);
        } catch (Exception e) {
            throw new FailedRequestException(ErrorCode.UNKNOWN_ERROR, "failed to update image");
        } finally {
            filePart.delete();
        }

        return new PictureApiModel(contents, extension, userId);
    }

    public PictureApiModel readProfilePicture(Request req, Response res, int id) throws FailedRequestException {
        Optional<PictureApiModel> optionalImageBytes = picturesDao.getPicture(req.attribute("user_id"));
        return optionalImageBytes.orElseThrow(() -> new FailedRequestException(ErrorCode.NOT_FOUND, "No image found for user"));
    }

    public Object deletePicture(Request req, Response res, int id) throws Exception {
        int userId = req.attribute("user_id");
        if (userId != id && userId != 0) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "userId cannot be specified differently to URI");
        }

        if (StringUtils.isNotEmpty(req.body())) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "Picture delete request should have no body");
        }

        // Do not do anything with output, if nothing to delete request is successfully done (no-op)
        picturesDao.deleteUserPicture(id);
        res.status(204);

        return new Object();
    }
}
