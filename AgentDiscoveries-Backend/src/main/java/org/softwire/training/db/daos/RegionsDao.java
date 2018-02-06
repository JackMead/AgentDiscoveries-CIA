package org.softwire.training.db.daos;

import org.jdbi.v3.core.Handle;
import org.jdbi.v3.core.Jdbi;
import org.softwire.training.models.Region;

import javax.inject.Inject;
import java.util.Optional;

public class RegionsDao {

    @Inject
    Jdbi jdbi;

    public Optional<Region> getRegion(int regionId) {
        try (Handle handle = jdbi.open()) {
            return handle.createQuery("SELECT * FROM region WHERE region_id = :region_id")
                    .bind("region_id", regionId)
                    .mapToBean(Region.class)
                    .findFirst()
                    .map(r -> {
                        r.setLocations(handle.createQuery("SELECT location_id FROM location_region " +
                                "WHERE region_id = :region_id")
                                .bind("region_id", regionId)
                                .mapTo(Integer.class)
                                .list());
                        return r;
                    });
        }
    }

    public int addRegion(Region region) {
        try (Handle handle = jdbi.open()) {
            int regionId = handle.createUpdate("INSERT INTO region (name) VALUE (:name)")
                    .bind("name", region.getName())
                    .executeAndReturnGeneratedKeys("region_id")
                    .mapTo(Integer.class)
                    .findOnly();

            boolean allLocationsInserted = false;
            try {
                for (int locationId: region.getLocations()) {
                    handle.createUpdate("INSERT INTO location_region (location_id, region_id) " +
                            "VALUES (:location_id, :region_id)")
                            .bind("location_id", locationId)
                            .bind("region_id", regionId)
                            .execute();
                }
                allLocationsInserted = true;

                return regionId;
            } finally {
                if (!allLocationsInserted) {
                    deleteRegion(regionId);
                }
            }
        }
    }

    public int deleteRegion(int region_id) {
        try (Handle handle = jdbi.open()) {
            try {
                return handle.createUpdate("DELETE FROM location_region WHERE region_id = :region_id")
                        .bind("region_id", region_id)
                        .execute();
            } finally {
                handle.createUpdate("DELETE FROM region WHERE region_id = :region_id")
                        .bind("region_id", region_id)
                        .execute();
            }
        }
    }

    public boolean regionExistWithLocationId(int locationId) {
        try (Handle handle = jdbi.open()) {
            return handle.createQuery("SELECT region_id FROM location_region WHERE location_id = :location_id LIMIT 1")
                    .bind("location_id", locationId)
                    .mapTo(Integer.class)
                    .findFirst()
                    .isPresent();
        }
    }
}
