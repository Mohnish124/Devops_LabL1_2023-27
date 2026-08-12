package com.retail.app;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RetailController {

    @GetMapping("/")
    public String home() {
        return """
                <html>
                <head>
                    <title>Retail Store</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f6f8;
                            text-align: center;
                            padding: 50px;
                        }
                        .container {
                            background: white;
                            padding: 40px;
                            border-radius: 12px;
                            max-width: 700px;
                            margin: auto;
                            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                        }
                        h1 {
                            color: #1976d2;
                        }
                        .category {
                            display: inline-block;
                            padding: 15px;
                            margin: 10px;
                            background: #e3f2fd;
                            border-radius: 8px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Retail Store</h1>
                        <p>Welcome to our retail web application</p>

                        <div class="category">Electronics</div>
                        <div class="category">Clothing</div>
                        <div class="category">Groceries</div>
                        <div class="category">Home Appliances</div>
                    </div>
                </body>
                </html>
                """;
    }
}