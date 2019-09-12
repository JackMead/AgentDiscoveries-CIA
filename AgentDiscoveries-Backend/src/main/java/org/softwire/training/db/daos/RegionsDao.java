package org.softwire.training.db.daos;

import org.softwire.training.models.Region;

import javax.inject.Inject;
import javax.persistence.EntityManagerFactory;
import java.util.List;
import java.util.Optional;

public class RegionsDao {

    private DaoHelper<Region> helper;

    @Inject
    public RegionsDao(EntityManagerFactory entityManagerFactory) {
        this.helper = new DaoHelper<>(entityManagerFactory);
    }

    public Optional<Region> getRegion(int regionId) {
        return helper.getEntity(Region.class, regionId);
    }

    public List<Region> getRegions() {
        return helper.getEntities(Region.class);
    }

    public int createRegion(Region region) {
        helper.createEntity(region);
        return region.getRegionId();
    }

    public void updateRegion(Region region) {
        helper.updateEntity(region);
    }

    public void deleteRegion(int regionId) {
        helper.deleteEntity(Region.class, regionId);
    }
}
