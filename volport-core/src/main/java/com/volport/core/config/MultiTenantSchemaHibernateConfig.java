package com.volport.core.config;

import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import com.volport.core.VolunteerApplication;

import org.hibernate.cfg.AvailableSettings;
import org.hibernate.context.spi.CurrentTenantIdentifierResolver;
import org.hibernate.engine.jdbc.connections.spi.MultiTenantConnectionProvider;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;

// TODO Remove multi-tenancy explicit settings since it's no longer needed in hibernate 6

@Configuration
public class MultiTenantSchemaHibernateConfig {

    private final JpaProperties jpaProperties;

    public MultiTenantSchemaHibernateConfig(JpaProperties jpaProperties){
        this.jpaProperties = jpaProperties;
    }

    @Bean
    JpaVendorAdapter jpaVendorAdapter(){
        return new HibernateJpaVendorAdapter();
    }

    @Bean
    LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource dataSource,
            MultiTenantConnectionProvider tenantConnectionProvider,
            CurrentTenantIdentifierResolver tenantIdentifierResolver) {
        var entityManager = new LocalContainerEntityManagerFactoryBean();

        entityManager.setDataSource(dataSource);
        entityManager.setPackagesToScan(VolunteerApplication.class.getPackageName());
        entityManager.setJpaVendorAdapter(this.jpaVendorAdapter());

        Map<String, Object> jpaPropertiesMap = new HashMap<>(jpaProperties.getProperties());
        jpaPropertiesMap.put(AvailableSettings.MULTI_TENANT_CONNECTION_PROVIDER, tenantConnectionProvider);
        jpaPropertiesMap.put(AvailableSettings.MULTI_TENANT_IDENTIFIER_RESOLVER, tenantIdentifierResolver);

        entityManager.setJpaPropertyMap(jpaPropertiesMap);
        return entityManager;
    }

}
