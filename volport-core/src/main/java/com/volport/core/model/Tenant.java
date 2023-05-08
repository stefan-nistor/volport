package com.volport.core.model;

import io.quantics.multitenant.tenantdetails.TenantSchemaDetails;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Tenant implements TenantSchemaDetails {

    @Id
    @Column(name = "tenant_id")
    private String tenantId;

    private String name;

    @Column(name = "schema")
    private String schema;

    private String issuer;

    @Override
    public String getId() {
        return this.tenantId;
    }

    @Override
    public String getIssuer() {
        return this.issuer;
    }

    @Override
    public String getJwkSetUrl() {
        return "";
    }
}
