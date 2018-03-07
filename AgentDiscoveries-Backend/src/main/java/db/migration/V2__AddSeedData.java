package db.migration;

import org.jdbi.v3.core.Handle;
import org.jdbi.v3.core.Jdbi;
import org.softwire.training.api.core.PasswordHasher;
import javax.inject.Inject;

public class V2__AddSeedData extends DaggerMigrationBase {

    @Override
    public Class<V2__AddSeedDataDaggerMigrationModule> getMigrationClass() {
        return V2__AddSeedDataDaggerMigrationModule.class;
    }

    public static class V2__AddSeedDataDaggerMigrationModule implements DaggerMigrationModule {

        @Inject
        PasswordHasher passwordHasher;
        @Inject
        Jdbi jdbi;

        @Override
        public void runMigration() {
            int userId1 = addUser("testuser1", passwordHasher.hashPassword("badpass"));
            int userId2 = addUser("testuser2", passwordHasher.hashPassword("alsobadpass"));
            int userId3 = addUser("corrupt_user", "impossible_hash");
        }

        public int addUser(String userName, String hashedPassword) {
            try (Handle handle = jdbi.open()) {
                return handle.createUpdate("INSERT INTO user (username, hashed_password) " +
                        "VALUES (:username, :hashed_password)")
                        .bind("username", userName)
                        .bind("hashed_password", hashedPassword)
                        .executeAndReturnGeneratedKeys("user_id")
                        .mapTo(Integer.class)
                        .findOnly();
            }
        }
    }


}
