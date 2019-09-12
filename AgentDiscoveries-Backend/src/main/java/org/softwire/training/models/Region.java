package org.softwire.training.models;

import javax.persistence.*;

@Entity
@Table(name = "regions")
public class Region {

    private int regionId;
    private String name;

    @Id
    @Column(name = "region_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getRegionId() {
        return regionId;
    }

    public void setRegionId(int regionId) {
        this.regionId = regionId;
    }

    @Column(name = "name", length = 50, nullable = false)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
