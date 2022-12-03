package com.ucr.cs225.spatial.project.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "New_Data_Set")
public class DataSet1 {

    @Id
    @GeneratedValue
    private int id;
    private String state;
    private String city;
    private float  latitude;
    private float longitude;
    private Date date;
}
