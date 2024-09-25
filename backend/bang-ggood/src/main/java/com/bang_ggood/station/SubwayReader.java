package com.bang_ggood.station;

import com.bang_ggood.station.domain.SubwayStation;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvValidationException;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class SubwayReader {

    private static final String SUBWAY_DATA_PATH = "classpath*:seoul_stations*.csv";

    public static List<SubwayStation> readSubwayStationData() {
        List<SubwayStation> stations = new ArrayList<>();
        try (CSVReader csvReader = new CSVReaderBuilder(
                new InputStreamReader(getSubwayStationResource().getInputStream(), Charset.forName("EUC-KR"))).build()) {
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

    private static Resource getSubwayStationResource() throws IOException {
        ResourcePatternResolver patternResolver = new PathMatchingResourcePatternResolver();
        Resource[] resources = patternResolver.getResources(SUBWAY_DATA_PATH);

        return Arrays.stream(resources)
                .filter(resource -> resource.getFilename() != null)
                .max(Comparator.comparing(Resource::getFilename))
                .orElseThrow(() -> new RuntimeException(SUBWAY_DATA_PATH + "를 읽어오는데 실패했습니다."));
    }
}
