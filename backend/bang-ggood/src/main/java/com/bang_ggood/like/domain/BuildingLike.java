package com.bang_ggood.like.domain;

import com.bang_ggood.BaseEntity;
import com.bang_ggood.building.domain.Building;
import com.bang_ggood.user.domain.User;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import static lombok.AccessLevel.PROTECTED;

@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = false)
@Getter
@NoArgsConstructor(access = PROTECTED)
@Entity
public class BuildingLike extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    private Building building;

    public BuildingLike(User user, Building building) {
        this.user = user;
        this.building = building;
    }
}
