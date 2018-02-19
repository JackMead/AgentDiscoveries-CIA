package db.migration;

import org.softwire.training.api.core.PasswordHasher;
import org.softwire.training.db.daos.UsersDao;
import org.softwire.training.models.User;

import javax.inject.Inject;

public class V5__AddAdminData extends DaggerMigrationBase {

    //TODO Either find a way to run this or remove it
    @Override
    public Class<V5__AddAdminDataDaggerMigrationModule> getMigrationClass() {
        return V5__AddAdminDataDaggerMigrationModule.class;
    }

    public static class V5__AddAdminDataDaggerMigrationModule implements DaggerMigrationModule {

        @Inject UsersDao usersDao;
        @Inject PasswordHasher passwordHasher;

        @Override
        public void runMigration() {
            User user = new User("adminUser1", passwordHasher.hashPassword("adminpass"));
            user.setAdmin(true);
            usersDao.addUser(user);
            }
    }
}
