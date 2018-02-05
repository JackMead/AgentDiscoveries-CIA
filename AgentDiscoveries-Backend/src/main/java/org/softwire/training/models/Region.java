package org.softwire.training.models;

import java.util.List;

public class Region {

    private int regionId;
    private String name;
    private List<Integer> locations;

    public int getRegionId() {
        return regionId;
    }

    public void setRegionId(int regionId) {
        this.regionId = regionId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Integer> getLocations() {
        return locations;
    }

    public void setLocations(List<Integer> locationIds) {
        this.locations = locationIds;
    }

}
