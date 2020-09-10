package com.mohamed.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import com.mohamed.app.domain.enumeration.TypeDocument;

/**
 * A Document.
 */
@Entity
@Table(name = "document")
public class Document implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private TypeDocument type;

    @ManyToOne
    @JsonIgnoreProperties("documents")
    private User teacher;

    @ManyToOne
    @JsonIgnoreProperties("documents")
    private Classe classe;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Document name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public TypeDocument getType() {
        return type;
    }

    public Document type(TypeDocument type) {
        this.type = type;
        return this;
    }

    public void setType(TypeDocument type) {
        this.type = type;
    }

    public User getTeacher() {
        return teacher;
    }

    public Document teacher(User user) {
        this.teacher = user;
        return this;
    }

    public void setTeacher(User user) {
        this.teacher = user;
    }

    public Classe getClasse() {
        return classe;
    }

    public Document classe(Classe classe) {
        this.classe = classe;
        return this;
    }

    public void setClasse(Classe classe) {
        this.classe = classe;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Document)) {
            return false;
        }
        return id != null && id.equals(((Document) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Document{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
