package com.ucr.cs225.spatial.project.service;

import com.ucr.cs225.spatial.project.entity.DataSet1;
import com.ucr.cs225.spatial.project.repository.DataSet1Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ucr.cs225.spatial.project.model.FilterRequest;

import java.sql.Date;
import java.util.*;

import com.ucr.cs225.spatial.project.Location;
import java.util.stream.Collectors;
import java.util.Set;
@Service
public class SpatialProjectService {
    @Autowired
    private DataSet1Repository repository1;




    public Set<Location> getResults(FilterRequest r) {
        String state=r.getState();
        String city=r.getCity();
        Date endDate= r.getEndDate();
        Date startDate=r.getStartDate();
        Map<Float,Set<Float>> latitudeMap=new HashMap<>();
        Set<Location> finalResult=new HashSet<>();
        List<Location> s;
        List<DataSet1> li1;
        if(startDate!=null){
            if(city!=null){
                if(state!=null){
                    li1=repository1.findIncidentByAll(startDate,endDate,state.toLowerCase(),city.toLowerCase());
                }
                else{
                    li1= repository1.findIncidentsByDateAndCity(startDate,endDate,city.toLowerCase());
                }
            }
            else{
                if(state!=null){
                    li1= repository1.findIncidentsByStateAndDate(startDate,endDate,state.toLowerCase());
                }
                else{
                    li1=repository1.findIncidentsByDate(startDate,endDate);
                }
            }
        }
        else{
            if(city!=null){
                if(state!=null){
                    li1= repository1.findIncidentsByStateAndCity(state.toLowerCase(),city.toLowerCase());
                }
                else{
                    li1= repository1.findIncidentsByCity(city.toLowerCase());
                }
            }
            else{
                if(state!=null){
                    li1=repository1.findIncidentsByState(state.toLowerCase());
                }
                else{
                    li1= repository1.findAll();
                }
            }
        }

        s= li1.stream().map(l->convertEntityToLocation(l)).collect(Collectors.toList());
        for(Location l : s){
            addingintoMap(latitudeMap,l);
        }
        for(Map.Entry<Float,Set<Float>> i:latitudeMap.entrySet()){
            for(Float j : i.getValue()){
                Location lo =new Location(i.getKey(),j);
                finalResult.add(lo);
            }
        }
        return finalResult;
    }

    public Location convertEntityToLocation(DataSet1 set1){
        Location l=new Location(set1.getLatitude(),set1.getLongitude());

        return l;
    }
    public  void  addingintoMap(Map<Float,Set<Float>> m,Location l) {
        if (m.containsKey(l.getLatitude())) {
            m.get(l.getLatitude()).add(l.getLongitude());
        }
        else{
            Set<Float> s= new HashSet<>();
            s.add(l.getLongitude());
            m.put(l.getLatitude(),s);
        }
    }


}
