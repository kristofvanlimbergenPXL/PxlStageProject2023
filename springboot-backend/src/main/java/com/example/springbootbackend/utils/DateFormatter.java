package com.example.springbootbackend.utils;


import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;

public final class DateFormatter {

    public static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofLocalizedDate(FormatStyle.SHORT);
}
