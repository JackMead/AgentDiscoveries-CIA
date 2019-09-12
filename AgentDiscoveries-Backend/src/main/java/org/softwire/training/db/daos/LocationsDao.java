package org.softwire.training.db.daos;

import org.softwire.training.models.Location;

import javax.inject.Inject;
import javax.persistence.EntityManagerFactory;
import java.util.List;
import java.util.Optional;

public class LocationsDao {

    private DaoHelper<Location> helper;

    @Inject
    public LocationsDao(EntityManagerFactory entityManagerFactory) {
        this.helper = new DaoHelper<>(entityManagerFactory);
    }

    public Optional<Location> getLocation(int locationId) {
        return helper.getEntity(Location.class, locationId);
    }

    public List<Location> getLocations() {
        return helper.getEntities(Location.class);
    }

    public int createLocation(Location location) {
        helper.createEntity(location);
        return location.getLocationId();
    }

    public void deleteLocation(int locationId) {
        helper.deleteEntity(Location.class, locationId);
    }

    public void updateLocation(Location location) {
        helper.updateEntity(location);
    }
}
