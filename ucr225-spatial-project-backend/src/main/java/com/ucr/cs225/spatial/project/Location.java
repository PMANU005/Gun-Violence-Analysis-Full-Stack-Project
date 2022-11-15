package com.ucr.cs225.spatial.project;

public class Location {
    public float latitude;
    public float longitude;

    public float getLatitude() {
        return latitude;

    }
    public Location(float latitude,float longitude){
        this.latitude=latitude;
        this.longitude=longitude;
    }
    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }

    public float getLongitude() {
        return longitude;
    }

    public void setLongitude(float longitude) {
        this.longitude = longitude;
    }
}
