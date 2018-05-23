package org.softwire.training.db.daos;

import org.jdbi.v3.core.Handle;
import org.jdbi.v3.core.Jdbi;
import org.softwire.training.models.Location;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class LocationsDao {

    @Inject
    Jdbi jdbi;

    public Optional<Location> getLocation(int locationId) {
        try (Handle handle = jdbi.open()) {
            return handle.createQuery("SELECT * FROM locations WHERE location_id = :location_id")
                    .bind("location_id", locationId)
                    .mapToBean(Location.class)
                    .findFirst();
        }
    }

    public List<Location> getLocations() {
        try (Handle handle = jdbi.open()) {
            return handle.createQuery("SELECT * FROM locations")
                    .mapToBean(Location.class)
                    .list();
        }
    }

    public int createLocation(Location location) {
        try (Handle handle = jdbi.open()) {
            return handle.createUpdate("INSERT INTO locations (location, site_name, time_zone, region_id) " +
                    "VALUES (:location, :site_name, :time_zone, :region_id)")
                    .bind("location", location.getLocation())
                    .bind("site_name", location.getSiteName())
                    .bind("time_zone", location.getTimeZone())
                    .bind("region_id", location.getRegionId())
                    .executeAndReturnGeneratedKeys("location_id")
                    .mapTo(Integer.class)
                    .findOnly();
        }
    }

    public void deleteLocation(int locationId) {
        try (Handle handle = jdbi.open()) {
            handle.createUpdate("DELETE FROM locations WHERE location_id = :location_id")
                    .bind("location_id", locationId)
                    .execute();
        }
    }

    public void updateLocation(Location location) {
        try (Handle handle = jdbi.open()) {
            handle.createUpdate("UPDATE locations SET location = :location, site_name = :site_name, " +
                    "time_zone = :time_zone, region_id = :region_id WHERE location_id = :location_id")
                    .bind("location_id", location.getLocationId())
                    .bind("location", location.getLocation())
                    .bind("site_name", location.getSiteName())
                    .bind("time_zone", location.getTimeZone())
                    .bind("region_id", location.getRegionId())
                    .execute();
        }
    }
}
