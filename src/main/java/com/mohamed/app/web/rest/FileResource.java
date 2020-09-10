package com.mohamed.app.web.rest;

import com.mohamed.app.domain.File;
import com.mohamed.app.repository.FileRepository;
import com.mohamed.app.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mohamed.app.domain.File}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FileResource {

    private final Logger log = LoggerFactory.getLogger(FileResource.class);

    private final FileRepository fileRepository;

    public FileResource(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    /**
     * {@code GET  /files} : get all the files.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of files in body.
     */
    @GetMapping("/files")
    public List<File> getAllFiles() {
        log.debug("REST request to get all Files");
        return fileRepository.findAll();
    }

    /**
     * {@code GET  /files/:id} : get the "id" file.
     *
     * @param id the id of the file to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the file, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/files/{id}")
    public ResponseEntity<File> getFile(@PathVariable Long id) {
        log.debug("REST request to get File : {}", id);
        Optional<File> file = fileRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(file);
    }
}
