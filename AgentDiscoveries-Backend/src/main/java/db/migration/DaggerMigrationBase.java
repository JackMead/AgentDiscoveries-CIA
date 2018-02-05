package db.migration;

import dagger.ObjectGraph;
import org.flywaydb.core.api.migration.jdbc.JdbcMigration;

import java.sql.Connection;

public abstract class DaggerMigrationBase implements JdbcMigration {

    @Override
    public void migrate(Connection connection) throws Exception {
        ObjectGraph objectGraph = ObjectGraph.create(new DbMigrationModule(connection));
        DaggerMigrationModule app = objectGraph.get(getMigrationClass());
        app.runMigration();
    }

    public abstract <T extends DaggerMigrationModule> Class<DaggerMigrationModule> getMigrationClass();

    public interface DaggerMigrationModule {
        void runMigration() throws Exception;
    }
}
