package db.migration;

import org.jdbi.v3.core.Handle;
import org.jdbi.v3.core.Jdbi;
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

        @Inject PasswordHasher passwordHasher;
        @Inject Jdbi jdbi;

        @Override
        public void runMigration() {
            addUser(new V5MigrationUser("admin", passwordHasher.hashPassword("adminpass"), true));
        }

        public int addUser(V5MigrationUser user) {
            try (Handle handle = jdbi.open()) {
                return handle.createUpdate("INSERT INTO user (username, hashed_password, admin) " +
                        "VALUES (:username, :hashed_password, :admin)")
                        .bind("username", user.getUsername())
                        .bind("hashed_password", user.getHashedPassword())
                        .bind("admin", user.isAdmin())
                        .execute();
            }
        }

        private class V5MigrationUser{
            private String username;
            private String hashedPassword;
            private boolean isAdmin;
            public V5MigrationUser(String username, String hashedPassword, boolean isAdmin){
                this.username=username;
                this.hashedPassword=hashedPassword;
                this.isAdmin=isAdmin;
            }

            public String getHashedPassword() {return hashedPassword;}
            public String getUsername() {return username;}
            public boolean isAdmin() { return isAdmin; }
        }
    }
}
