package db.migration;

import org.softwire.training.api.core.PasswordHasher;
import org.softwire.training.db.daos.UsersDao;
import org.softwire.training.models.User;

import javax.inject.Inject;

public class V5__AddAdminUser extends DaggerMigrationBase {
    @Override
    public Class<V5__AddAdminUser.V5_AddAdminUserDaggerMigrationModule> getMigrationClass() {
        return V5__AddAdminUser.V5_AddAdminUserDaggerMigrationModule.class;
    }

    public static class V5_AddAdminUserDaggerMigrationModule implements DaggerMigrationBase.DaggerMigrationModule {

        @Inject
        UsersDao usersDao;
        @Inject
        PasswordHasher passwordHasher;

        @Override
        public void runMigration() {
            User admin = new User("admin", passwordHasher.hashPassword("adminpass"));
            int userId = usersDao.addUser(admin);
            admin.setUserId(userId);
            admin.setAdmin(true);
            usersDao.updateUser(admin);
        }
    }
}
