package db.migration;

import org.jdbi.v3.core.Handle;
import org.jdbi.v3.core.Jdbi;
import org.softwire.training.api.core.PasswordHasher;
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

        @Inject PasswordHasher passwordHasher;
        @Inject Jdbi jdbi;

        @Override
        public void runMigration() {
            addUser("testuser1", passwordHasher.hashPassword("badpass"));
            addUser("testuser2", passwordHasher.hashPassword("alsobadpass"));
            addUser("corrupt_user", "impossible_hash");
        }

        public int addUser(String userName, String hashedPassword) {
            try (Handle handle = jdbi.open()) {
                return handle.createUpdate("INSERT INTO user (username, hashed_password) " +
                        "VALUES (:username, :hashed_password)")
                        .bind("username", userName)
                        .bind("hashed_password", hashedPassword)
                        .execute();
            }
        }
    }


}
