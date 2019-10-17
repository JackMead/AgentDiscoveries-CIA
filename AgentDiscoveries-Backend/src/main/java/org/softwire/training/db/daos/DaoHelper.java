package org.softwire.training.db.daos;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import java.util.List;
import java.util.Optional;

class DaoHelper<T> {

    EntityManagerFactory entityManagerFactory;

    DaoHelper(EntityManagerFactory entityManagerFactory) {
        this.entityManagerFactory = entityManagerFactory;
    }


    Optional<T> getEntity(Class<T> entityClass, int id) {

        EntityManager em = entityManagerFactory.createEntityManager();
        em.getTransaction().begin();
        T entity = em.find(entityClass, id);
        em.getTransaction().commit();
        em.close();
        return Optional.ofNullable(entity);
    }

    List<T> getNrOfEntities(Class<T> entityClass, int limit) {
        EntityManager em = entityManagerFactory.createEntityManager();
        em.getTransaction().begin();

        List<T> results = em.createQuery("SELECT f FROM " + entityClass.getSimpleName() +
                " f INNER JOIN f.user u" +
                " ORDER BY MessageId DESC", entityClass).setMaxResults(limit).getResultList();
        em.getTransaction().commit();
        em.close();
        return results;
    }

    List<T> getEntities(Class<T> entityClass) {
        EntityManager em = entityManagerFactory.createEntityManager();
        em.getTransaction().begin();

        List<T> results = em.createQuery("FROM " + entityClass.getSimpleName(), entityClass).getResultList();
        em.getTransaction().commit();
        em.close();
        return results;
    }

    void createEntity(T entity) {
        EntityManager em = entityManagerFactory.createEntityManager();
        em.getTransaction().begin();
        em.persist(entity);
        em.flush();
        em.getTransaction().commit();
        em.close();
    }

    void deleteEntity(Class<T> entityClass, int id) {
        EntityManager em = entityManagerFactory.createEntityManager();
        em.getTransaction().begin();
        T entity = em.find(entityClass, id);
        if (entity != null) {
            em.remove(entity);
        }
        em.getTransaction().commit();
        em.close();
    }

    void updateEntity(T entity) {
        EntityManager em = entityManagerFactory.createEntityManager();
        em.getTransaction().begin();
        em.merge(entity);
        em.getTransaction().commit();
        em.close();
    }
}
