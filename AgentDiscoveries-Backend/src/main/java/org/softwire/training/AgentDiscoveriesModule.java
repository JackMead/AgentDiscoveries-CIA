package org.softwire.training;

import dagger.Module;
import dagger.Provides;
import org.apache.commons.configuration2.Configuration;
import org.flywaydb.core.Flyway;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

@Module(injects = AgentDiscoveriesApplication.class)
public class AgentDiscoveriesModule {

    private final Configuration config;
    private final EntityManagerFactory entityManagerFactory;

    public AgentDiscoveriesModule(Configuration config) {
        this.config = config;
        entityManagerFactory = Persistence.createEntityManagerFactory("org.softwire.training.jpa");
    }

    @Provides
    public Configuration providesConfiguration() {
        return config;
    }

    @Provides
    public Flyway providesFlyway() {
        Flyway flyway = new Flyway();
        flyway.setDataSource(
                config.getString("database.url"),
                config.getString("database.username"),
                config.getString("database.password"));

        return flyway;
    }

    @Provides
    public EntityManagerFactory providesEntityManagerFactory() { return entityManagerFactory; }
}
