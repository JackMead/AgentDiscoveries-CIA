package db.migration;

import org.jdbi.v3.core.Handle;
import org.jdbi.v3.core.Jdbi;
import org.softwire.training.api.core.PasswordHasher;
import org.softwire.training.models.User;

import javax.inject.Inject;

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
            addUser(new V2MigrationUser("testuser1", passwordHasher.hashPassword("badpass")));
            addUser(new V2MigrationUser("testuser2", passwordHasher.hashPassword("alsobadpass")));
            addUser(new V2MigrationUser("corrupt_user", "impossible_hash"));
        }

        public int addUser(V2MigrationUser user) {
            try (Handle handle = jdbi.open()) {
                return handle.createUpdate("INSERT INTO user (username, hashed_password) " +
                        "VALUES (:username, :hashed_password)")
                        .bind("username", user.getUsername())
                        .bind("hashed_password", user.getHashedPassword())
                        .execute();
            }
        }

        private class V2MigrationUser{
            private String username;
            private String hashedPassword;
            public V2MigrationUser(String username, String hashedPassword){
                this.username=username;
                this.hashedPassword=hashedPassword;
            }

            public String getHashedPassword() {return hashedPassword;}

            public String getUsername() {return username;}
        }
    }


}
