package db.migration;

import org.jdbi.v3.core.Handle;
import org.jdbi.v3.core.Jdbi;
import org.softwire.training.api.core.PasswordHasher;
import org.softwire.training.db.daos.AgentsDao;
import org.softwire.training.db.daos.UsersDao;
import org.softwire.training.models.Agent;
import org.softwire.training.models.User;

import javax.inject.Inject;
import java.time.LocalDate;

public class V5__AddAdminUser extends DaggerMigrationBase {
    @Override
    public Class<V5__AddAdminUser.V5_AddAdminUserDaggerMigrationModule> getMigrationClass() {
        return V5__AddAdminUser.V5_AddAdminUserDaggerMigrationModule.class;
    }

    public static class V5_AddAdminUserDaggerMigrationModule implements DaggerMigrationBase.DaggerMigrationModule {

        @Inject PasswordHasher passwordHasher;
        @Inject Jdbi jdbi;
        @Inject
        AgentsDao agentsDao;

        @Override
        public void runMigration() {
            int userId = addUser("admin", passwordHasher.hashPassword("adminpass"), true);
            agentsDao.addAgent(new Agent(userId, "Dr", "Y", LocalDate.of(2004, 11, 4), 0, "The Administrator"));
        }

        public int addUser(String userName, String hashedPassword, boolean isAdmin) {
            try (Handle handle = jdbi.open()) {
                return handle.createUpdate("INSERT INTO user (username, hashed_password, admin) " +
                        "VALUES (:username, :hashed_password, :admin)")
                        .bind("username", userName)
                        .bind("hashed_password", hashedPassword)
                        .bind("admin", isAdmin)
                        .executeAndReturnGeneratedKeys("user_id")
                        .mapTo(Integer.class)
                        .findOnly();
            }
        }
    }
}
