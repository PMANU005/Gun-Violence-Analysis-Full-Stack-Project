package com.ucr.cs225.spatial.project.repository;

import com.ucr.cs225.spatial.project.entity.DataSet1;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.*;
import java.sql.Date;
import org.springframework.data.repository.query.Param;

public interface DataSet1Repository extends JpaRepository<DataSet1,Integer> {

    @Query(value="select * from new_data_set p where p.date> :date1 and p.date < :date2", nativeQuery = true)
    List<DataSet1> findIncidentsByDate(@Param("date1")Date date1, @Param("date2")Date date2);

    @Query(value="select * from new_data_set p where lower(p.city)= :city", nativeQuery = true)
    List<DataSet1> findIncidentsByCity(@Param("city")String city);

    @Query(value="select * from new_data_set p where lower(p.state)= :state", nativeQuery = true)
    List<DataSet1> findIncidentsByState(@Param("state")String state);

    @Query(value="select * from new_data_set p where p.date> :date1 and p.date < :date2 and lower(p.city) = :city", nativeQuery = true)
    List<DataSet1> findIncidentsByDateAndCity(@Param("date1")Date date1, @Param("date2")Date date2, @Param("city")String city);

    @Query(value="select * from new_data_set p where lower(p.state)= :state and lower(p.city) = :city", nativeQuery = true)
    List<DataSet1> findIncidentsByStateAndCity(@Param("state")String state, @Param("city")String city);

    @Query(value="select * from new_data_set p where p.date> :date1 and p.date < :date2 and lower(p.state)= :state", nativeQuery = true)
    List<DataSet1> findIncidentsByStateAndDate(@Param("date1")Date date1, @Param("date2")Date date2, @Param("state")String state);
    @Query(value="select * from new_data_set p where p.date> :date1 and p.date < :date2 and lower(p.state)= :state and lower(p.city)= :city", nativeQuery = true)
    List<DataSet1> findIncidentByAll(@Param("date1")Date date1, @Param("date2")Date date2, @Param("state")String state, @Param("city")String city);
}

