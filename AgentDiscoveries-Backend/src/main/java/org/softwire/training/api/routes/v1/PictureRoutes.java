package org.softwire.training.api.routes.v1;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.configuration2.Configuration;
import org.softwire.training.api.models.ErrorCode;
import org.softwire.training.api.models.FailedRequestException;
import org.softwire.training.models.ProfilePicture;
import org.softwire.training.db.daos.PicturesDao;
import spark.Request;
import spark.Response;
import spark.utils.IOUtils;

import javax.inject.Inject;
import javax.servlet.MultipartConfigElement;
import javax.servlet.ServletException;
import javax.servlet.http.Part;
import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

public class PictureRoutes {
    private final PicturesDao picturesDao;
    private final Configuration configuration;

    @Inject
    public PictureRoutes(PicturesDao picturesDao, Configuration configuration) {
        this.picturesDao = picturesDao;
        this.configuration = configuration;
    }

    public Object updatePicture(Request req, Response res, int id) throws IOException, ServletException {
        int userId = req.attribute("user_id");
        if (userId != id && userId != 0) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "userId cannot be specified differently to URI");
        }

        req.raw().setAttribute("org.eclipse.jetty.multipartConfig", new MultipartConfigElement("/default"));
        Part filePart = req.raw().getPart("file");
        if (filePart.getSize() > configuration.getInt("database.picture.bytes-limit")) {
            filePart.delete();
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "picture is larger than 1MB");
        }

        String contentType = filePart.getContentType();
        ArrayList<String> allowedContentTypes = getAllowedContentTypes();
        if (!allowedContentTypes.contains(contentType)) {
            filePart.delete();
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "file is not a valid type");
        }

        try (final InputStream in = filePart.getInputStream()) {
            picturesDao.createOrUpdateUserPicture(userId, IOUtils.toByteArray(in), contentType);
        } catch (Exception e) {
            throw new FailedRequestException(ErrorCode.UNKNOWN_ERROR, "failed to update picture");
        } finally {
            filePart.delete();
        }

        return new Object();
    }

    public byte[] readProfilePicture(Request req, Response res, int id) {
        Optional<ProfilePicture> optionalPicture = picturesDao.getPicture(req.attribute("user_id"));
        ProfilePicture profilePicture = optionalPicture.orElseThrow(() -> new FailedRequestException(ErrorCode.NOT_FOUND, "No picture found for user"));
        res.type(profilePicture.getContentType());
        return profilePicture.getPictureBytes();
    }

    public Object deletePicture(Request req, Response res, int id) {
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

    private ArrayList<String> getAllowedContentTypes(){
        String[] allowedContent = configuration.getStringArray("database.picture.allowed-content-types");
        return new ArrayList<>(Arrays.asList(allowedContent));
    }
}
