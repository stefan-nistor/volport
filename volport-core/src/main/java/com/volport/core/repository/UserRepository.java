package com.volport.core.repository;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.SetOptions;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import com.volport.core.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class UserRepository {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserRepository.class);

    public User save(User user) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        ApiFuture<WriteResult> apiFuture = db.collection("users").document(user.getUid()).set(user, SetOptions.merge());
        WriteResult writeResult = apiFuture.get();
        LOGGER.info("Successfully saved, updated time: {}", writeResult.getUpdateTime());
        return user;
    }

    public User get(String uid) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<DocumentSnapshot> apiFuture = db.collection("users").document(uid).get();
        var document = apiFuture.get();
        if(document.exists()) {
            LOGGER.info("User found: {}", uid);
            return document.toObject(User.class);
        }
        LOGGER.error("User not found: {}", uid);
        return null;
    }

}
