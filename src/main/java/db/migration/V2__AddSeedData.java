package db.migration;

import org.softwire.training.api.core.PasswordHasher;
import org.softwire.training.db.daos.UsersDao;
import org.softwire.training.models.User;

import javax.inject.Inject;

public class V2__AddSeedData extends DaggerMigrationBase {

    @Override
    public Class<V2__AddSeedDataDaggerMigrationModule> getMigrationClass() {
        return V2__AddSeedDataDaggerMigrationModule.class;
    }

    public static class V2__AddSeedDataDaggerMigrationModule implements DaggerMigrationModule {

        @Inject UsersDao usersDao;
        @Inject PasswordHasher passwordHasher;

        @Override
        public void runMigration() {
            usersDao.addUser(new User("testuser1", passwordHasher.hashPassword("badpass")));
            usersDao.addUser(new User("testuser2", passwordHasher.hashPassword("alsobadpass")));
            usersDao.addUser(new User("corrupt_user", "impossible_hash"));
        }
    }
}
