package com.mohamed.app.web.rest;


import com.mohamed.app.domain.CustomDocument;
import com.mohamed.app.domain.Document;
import com.mohamed.app.security.AuthoritiesConstants;
import com.mohamed.app.service.FileService;
import io.github.jhipster.web.util.HeaderUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:9000/document/new")
public class FileController {

	List<String> files = new ArrayList<String>();

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

	@Autowired
	private final FileService fileService;

	public FileController(FileService fileService) {
		this.fileService = fileService;
	}

	@PostMapping(value = "/api/files")
	public ResponseEntity<CustomDocument> handleFileUpload(@RequestParam("file") MultipartFile file) throws IOException, URISyntaxException {
		fileService.storeFile(file);
        return ResponseEntity.created(new URI("/api/files" ))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true,null, null))
            .body(null);
	}


	@GetMapping("/getallfiles")
	public String getListFiles() throws IOException {
		String fileName = fileService.getFiles().name();

		return fileName;
	}

}
