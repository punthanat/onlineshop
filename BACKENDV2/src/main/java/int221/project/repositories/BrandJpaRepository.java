package int221.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import int221.project.models.Brand;

public interface BrandJpaRepository extends JpaRepository<Brand, Integer>  {

}
