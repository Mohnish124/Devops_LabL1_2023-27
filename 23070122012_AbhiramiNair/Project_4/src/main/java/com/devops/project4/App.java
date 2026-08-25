package com.devops.project4;

public class App {

    public String getPipelineMessage() {
        return "Project 4 distributed Jenkins pipeline is working";
    }

    public int add(int first, int second) {
        return first + second;
    }

    public static void main(String[] args) {
        App app = new App();
        System.out.println(app.getPipelineMessage());
        System.out.println("2 + 3 = " + app.add(2, 3));
    }
}
