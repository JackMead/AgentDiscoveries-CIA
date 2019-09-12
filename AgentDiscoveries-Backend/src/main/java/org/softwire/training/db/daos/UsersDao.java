package org.softwire.training.db.daos;

import org.softwire.training.models.User;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import java.util.List;
import java.util.Optional;

public class UsersDao {

    private EntityManagerFactory entityManagerFactory;
    private DaoHelper<User> helper;

    @Inject
    public UsersDao(EntityManagerFactory entityManagerFactory) {
        this.entityManagerFactory = entityManagerFactory;
        this.helper = new DaoHelper<>(entityManagerFactory);
    }

    public Optional<User> getUserByUsername(String username) {
        EntityManager em = entityManagerFactory.createEntityManager();
        em.getTransaction().begin();

        List<User> results = em.createQuery("FROM User WHERE username LIKE :username", User.class).setParameter("username", username).getResultList();

        em.getTransaction().commit();
        em.close();

        User user = null;
        if (!results.isEmpty()) {
            user = results.get(0);
        }
        return Optional.ofNullable(user);
    }

    public Optional<User> getUser(int userId) {
        return helper.getEntity(User.class, userId);
    }

    public List<User> getUsers() {
        return helper.getEntities(User.class);
    }

    public int addUser(User user) {
        helper.createEntity(user);
        return user.getUserId();
    }

    public void deleteUser(int userId) {
        helper.deleteEntity(User.class, userId);
    }

    public void updateUser(User user) {
        helper.updateEntity(user);
    }
}
