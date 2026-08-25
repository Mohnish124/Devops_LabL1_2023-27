package com.pratik.retail_store_app;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/products")
    public String products() {
        return "Products Service Running";
    }

    @GetMapping("/customers")
    public String customers() {
        return "Customers Service Running";
    }
}