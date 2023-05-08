package com.volport.core.service;

import java.util.Optional;

import com.volport.core.repository.TenantRepository;
import io.quantics.multitenant.tenantdetails.TenantSchemaDetails;
import io.quantics.multitenant.tenantdetails.TenantSchemaDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TenantServiceImpl implements TenantSchemaDetailsService {

    @Autowired
    private TenantRepository tenantRepository;

    @Override
    public Iterable<? extends TenantSchemaDetails> getAll() {
        return tenantRepository.findAll();
    }

    @Override
    public Optional<? extends TenantSchemaDetails> getById(String id) {
        return tenantRepository.findTenantByTenantId(id);
    }

    @Override
    public Optional<? extends TenantSchemaDetails> getByIssuer(String issuer) {
        return tenantRepository.findTenantByIssuer(issuer);
    }
}
