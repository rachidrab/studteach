package com.mohamed.app.service;

import com.mohamed.app.domain.User;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;

@Service
public class FileService {

	private static final String FILE_DIRECTORY = "\\files";

	public void storeFile(MultipartFile file) throws IOException {
		Path filePath = Paths.get(FILE_DIRECTORY + "/" + file.getOriginalFilename());

		Files.copy(file.getInputStream(), filePath.toAbsolutePath(), StandardCopyOption.REPLACE_EXISTING);
	}

	public FileStore getFiles() throws IOException {
		Path filePath = Paths.get(FILE_DIRECTORY);
		return Files.getFileStore(filePath);
	}
}
