package org.softwire.training.db.daos;

import org.jdbi.v3.core.Handle;
import org.jdbi.v3.core.Jdbi;
import org.softwire.training.models.Region;

import javax.inject.Inject;
import java.util.List;
import java.util.Optional;

public class RegionsDao {

    @Inject
    Jdbi jdbi;

    public Optional<Region> getRegion(int regionId) {
        try (Handle handle = jdbi.open()) {
            return handle.createQuery("SELECT * FROM regions WHERE region_id = :region_id")
                    .bind("region_id", regionId)
                    .mapToBean(Region.class)
                    .findFirst();
        }
    }

    public List<Region> getRegions() {
        try (Handle handle = jdbi.open()) {
            return handle.createQuery("SELECT * FROM regions")
                    .mapToBean(Region.class)
                    .list();
        }
    }

    public int createRegion(Region region) {
        try (Handle handle = jdbi.open()) {
            return handle.createUpdate("INSERT INTO regions (name) VALUE (:name)")
                    .bind("name", region.getName())
                    .executeAndReturnGeneratedKeys("region_id")
                    .mapTo(Integer.class)
                    .findOnly();
        }
    }

    public void updateRegion(Region region) {
        try (Handle handle = jdbi.open()) {
            handle.createUpdate("UPDATE regions SET name = :name WHERE region_id = :region_id")
                    .bind("name", region.getName())
                    .bind("region_id", region.getRegionId())
                    .execute();
        }
    }

    public void deleteRegion(int regionId) {
        try (Handle handle = jdbi.open()) {
            handle.createUpdate("DELETE FROM regions WHERE region_id = :region_id")
                    .bind("region_id", regionId)
                    .execute();
        }
    }
}
