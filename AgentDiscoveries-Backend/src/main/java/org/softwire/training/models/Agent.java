package org.softwire.training.models;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "agents")
public class Agent {

    private int agentId;
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    private int rank;
    private String callSign;

    public Agent() {}

    public Agent(int agentId, String firstName, String lastName, LocalDate dateOfBirth, int rank, String callSign) {
        this.agentId = agentId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.rank = rank;
        this.callSign = callSign;
    }

    @Id
    @Column(name = "agent_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getAgentId() {
        return agentId;
    }

    public void setAgentId(int agentId) {
        this.agentId = agentId;
    }

    @Column(name = "first_name", length = 30, nullable = false)
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Column(name = "last_name", length = 100, nullable = false)
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Convert(converter = LocalDateAttributeConverter.class)
    @Column(name = "date_of_birth", nullable = false)
    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    @Column(name = "rank", nullable = false)
    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    @Column(name = "call_sign", length = 20, unique = true, nullable = false)
    public String getCallSign() {
        return callSign;
    }

    public void setCallSign(String callSign) {
        this.callSign = callSign;
    }
}
