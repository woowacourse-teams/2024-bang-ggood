package com.bang_ggood.utils;

import com.bang_ggood.station.domain.SubwayStation;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvValidationException;
import org.springframework.core.io.ClassPathResource;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

public class FileReader {

    public static final String SUBWAY_DATA_PATH = "seoul_stations_240819.csv";

    public static List<SubwayStation> readSubwayStationData() {
        List<SubwayStation> stations = new ArrayList<>();
        ClassPathResource resource = new ClassPathResource(SUBWAY_DATA_PATH);
        try (CSVReader csvReader = new CSVReaderBuilder(
                new InputStreamReader(resource.getInputStream(), Charset.forName("EUC-KR"))).build()) {
            String[] line = csvReader.readNext(); // drop first row
            while ((line = csvReader.readNext()) != null) {
                SubwayStation station = new SubwayStation(
                        Integer.parseInt(line[0]),
                        line[1],
                        line[2],
                        Double.parseDouble(line[3]),
                        Double.parseDouble(line[4]));
                stations.add(station);
            }
            return stations;
        } catch (IOException | CsvValidationException e) {
            throw new RuntimeException("지하철 데이터 파일을 읽어오는데 실패했습니다.");
        }
    }
}
