package com.volport.core.repository;

import java.util.Optional;

import com.volport.core.model.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TenantRepository extends JpaRepository<Tenant, String> {

    Optional<Tenant> findTenantByTenantId(String tenantId);
    Optional<Tenant> findTenantByIssuer(String issuer);
}
