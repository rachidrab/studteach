package com.mohamed.app.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "document_classe")
public class CustomDocument {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "document", nullable = false)
    private String document;

    @NotNull
    @Column(name = "classe_id", nullable = false)
    private Long classe_id;

    public CustomDocument() {
    }

    public CustomDocument(@NotNull String document, @NotNull Long classe_id) {
        this.document = document;
        this.classe_id = classe_id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDocument() {
        return document;
    }

    public void setDocument(String document) {
        this.document = document;
    }

    public Long getClasse_id() {
        return classe_id;
    }

    public void setClasse_id(Long classe_id) {
        this.classe_id = classe_id;
    }
}
