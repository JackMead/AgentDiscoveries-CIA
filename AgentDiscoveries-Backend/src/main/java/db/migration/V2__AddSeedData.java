package db.migration;

import org.softwire.training.api.core.PasswordHasher;
import org.softwire.training.db.daos.AgentsDao;
import org.softwire.training.db.daos.UsersDao;
import org.softwire.training.models.Agent;
import org.softwire.training.models.User;

import javax.inject.Inject;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

public class V2__AddSeedData extends DaggerMigrationBase {

    @Override
    public Class<V2__AddSeedDataDaggerMigrationModule> getMigrationClass() {
        return V2__AddSeedDataDaggerMigrationModule.class;
    }

    public static class V2__AddSeedDataDaggerMigrationModule implements DaggerMigrationModule {

        @Inject
        UsersDao usersDao;
        @Inject
        AgentsDao agentsDao;
        @Inject
        PasswordHasher passwordHasher;

        @Override
        public void runMigration() {
            int userId1 = usersDao.addUser(new User("testuser1", passwordHasher.hashPassword("badpass")));
            int userId2 = usersDao.addUser(new User("testuser2", passwordHasher.hashPassword("alsobadpass")));
            int userId3 = usersDao.addUser(new User("corrupt_user", "impossible_hash"));
            agentsDao.addAgent(new Agent(userId1, "aName", "another", LocalDate.now(), 0, "aCallSign"));
            agentsDao.addAgent(new Agent(userId2, "James", "Bond", LocalDate.now(), 0, "007"));
            agentsDao.addAgent(new Agent(userId3, "Dr", "X", LocalDate.of(2004,11,4), 0, "evil"));
        }
    }
}
