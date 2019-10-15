package org.softwire.training.api.routes.v1;

import com.google.common.base.Strings;
import org.softwire.training.api.core.JsonRequestUtils;
import org.softwire.training.api.core.PasswordHasher;
import org.softwire.training.api.core.PermissionsVerifier;
import org.softwire.training.api.models.ErrorCode;
import org.softwire.training.api.models.FailedRequestException;
import org.softwire.training.api.models.UserApiModel;
import org.softwire.training.db.daos.UsersDao;
import org.softwire.training.models.User;
import spark.Request;
import spark.Response;
import spark.utils.StringUtils;

import javax.inject.Inject;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

public class UsersRoutes implements EntityCRUDRoutes {

    private final UsersDao usersDao;
    private final PasswordHasher passwordHasher;
    private final PermissionsVerifier permissionsVerifier;

    @Inject
    public UsersRoutes(UsersDao usersDao, PasswordHasher passwordHasher, PermissionsVerifier permissionsVerifier) {
        this.usersDao = usersDao;
        this.passwordHasher = passwordHasher;
        this.permissionsVerifier = permissionsVerifier;
    }

    @Override
    public UserApiModel createEntity(Request req, Response res) {
        permissionsVerifier.verifyAdminPermission(req);
        UserApiModel userApiModel = JsonRequestUtils.readBodyAsType(req, UserApiModel.class);

        if (userApiModel.getUserId() != 0) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "userId cannot be specified on create");
        }

        if (userApiModel.getUsername().length() > 20){
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "Username cannot be greater than 20 characters.");

        }

        User user = new User(
                userApiModel.getUsername(),
                passwordHasher.hashPassword(userApiModel.getPassword()),
                userApiModel.isAdmin(),
                userApiModel.getAgentId());


        int newUserId = usersDao.addUser(user);

        // Set the userId and for security remove the password
        userApiModel.setPassword(null);
        userApiModel.setUserId(newUserId);

        // Create requests should return 201
        res.status(201);

        return userApiModel;
    }

    @Override
    public UserApiModel readEntity(Request req, Response res, int id) {
        permissionsVerifier.verifyIsAdminOrRelevantUser(req, id);

        return usersDao.getUser(id)
                .map(this::mapModelToApiModel)
                .orElseThrow(() -> new FailedRequestException(ErrorCode.NOT_FOUND, "User not found"));
    }

    @Override
    public List<UserApiModel> readEntities(Request req, Response res) {
        permissionsVerifier.verifyAdminPermission(req);
        return usersDao.getUsers().stream()
                .map(this::mapModelToApiModel)
                .collect(toList());
    }

    @Override
    public UserApiModel updateEntity(Request req, Response res, int id) {
        UserApiModel userApiModel = JsonRequestUtils.readBodyAsType(req, UserApiModel.class);

        permissionsVerifier.verifyIsAdminOrRelevantUser(req, id);

        Optional<User> optionalUser = usersDao.getUser(id);
        if (!optionalUser.isPresent()) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "userId cannot be found");
        }

        User oldUser = optionalUser.get();

        User user = new User(
                userApiModel.getUsername(),
                Strings.isNullOrEmpty(userApiModel.getPassword())
                        ? oldUser.getHashedPassword()
                        : passwordHasher.hashPassword(userApiModel.getPassword()),
                userApiModel.isAdmin(),
                userApiModel.getAgentId());

        user.setUserId(id);
        usersDao.updateUser(user);

        return mapModelToApiModel(user);
    }

    private UserApiModel mapModelToApiModel(User user) {
        UserApiModel userApiModel = new UserApiModel();
        userApiModel.setUserId(user.getUserId());
        userApiModel.setUsername(user.getUsername());
        userApiModel.setAgentId(user.getAgentId());
        userApiModel.setAdmin(user.isAdmin());
        // Deliberately do not set the password for security reasons

        return userApiModel;
    }

    @Override
    public Object deleteEntity(Request req, Response res, int id) {
        permissionsVerifier.verifyAdminPermission(req);

        if (StringUtils.isNotEmpty(req.body())) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "User delete request should have no body");
        }

        // Do not do anything with output, if nothing to delete request is successfully done (no-op)
        usersDao.deleteUser(id);
        res.status(204);

        return new Object();
    }
}
