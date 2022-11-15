package com.ucr.cs225.spatial.project.controller;


import com.ucr.cs225.spatial.project.Location;
import com.ucr.cs225.spatial.project.service.SpatialProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.ucr.cs225.spatial.project.model.FilterRequest;

import java.util.*;

@RestController
public class SpatialProjectController {

    @Autowired
    private SpatialProjectService service;

    @GetMapping("/incidents")
    public Set<Location> findProducts(@RequestBody FilterRequest r) {
        return service.getResults(r);
    }




}
