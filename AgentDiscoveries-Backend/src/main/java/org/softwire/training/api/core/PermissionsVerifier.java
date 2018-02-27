package org.softwire.training.api.core;

import org.softwire.training.api.models.ErrorCode;
import org.softwire.training.api.models.FailedRequestException;
import org.softwire.training.db.daos.AgentsDao;
import org.softwire.training.db.daos.UsersDao;
import org.softwire.training.models.User;
import spark.Request;

import javax.inject.Inject;
import java.util.Optional;

public class PermissionsVerifier {
    private final UsersDao usersDao;

    @Inject
    public PermissionsVerifier(UsersDao usersDao) {
        this.usersDao = usersDao;
    }

    public boolean isAdmin(int userId) throws FailedRequestException {
        Optional<User> optionalUser = usersDao.getUser(userId);
        return optionalUser.map(User::isAdmin)
                .orElseThrow(() -> new FailedRequestException(ErrorCode.NOT_FOUND, "User not found"));
    }

    public boolean isAdminOrRelevantAgent(Request req, int id) throws FailedRequestException{
        int userId = req.attribute("user_id");
        if(userId!=id){
            return isAdmin(userId);
        }
        return true;
    }
}
