import produce from 'immer';
import { createStore, compose } from 'redux';


let initialState = {
    user: {
        _id: 'eyJhbGciOiJIUzI1NiJ9.NjA3ZmU1ZjhkNzhkZDcxN2ZjZTE0OGYy.Ns1jCYTytmM6OKjBb5Av4a3eEZnPqXoRiRMbjs8Fu4s',
        userName: '',
        password: '',
        email: '',
        nasaImages: [{
            date: "2020-02-17",
            explanation: "Besides fading, is Betelgeuse changing its appearance? Yes. The famous red supergiant star in the familiar constellation of Orion is so large that telescopes on Earth can actually resolve its surface -- although just barely. The two featured images taken with the European Southern Observatory's Very Large Telescope show how the star's surface appeared during the beginning and end of last year.  The earlier image shows Betelgeuse having a much more uniform brightness than the later one, while the lower half of Betelgeuse became significantly dimmer than the top. Now during the first five months of 2019 amateur observations show Betelgeuse actually got slightly brighter, while in the last five months the star dimmed dramatically. Such variability is likely just normal behavior for this famously variable supergiant, but the recent dimming has rekindled discussion on how long it may be before Betelgeuse does go supernova. \t Since Betelgeuse is about 700 light years away, its eventual supernova -- probably thousands of years in the future -- will likely be an amazing night-sky spectacle, but will not endanger life on Earth.",
            media_type: "image",
            title: "The Changing Surface of Fading Betelgeuse",
            url: "https://apod.nasa.gov/apod/image/2002/Betelgeuse2019_ESO_1080.jpg"
        },
        {
            date: '2010-08-17',
            explanatio: "The great variety of star colors in this open cluster underlies its name: The Jewel Box.  One of the bright central stars is a red supergiant, in contrast to the many blue stars that surround it.  The cluster, also known as Kappa Crucis contains just over 100 stars, and is about 10 million years old.  Open clusters are younger, contain few stars, and contain a much higher fraction of blue stars than do globular clusters.  This Jewel Box lies about 6,400 light-years away, so the light that we see today was emitted from the cluster before even the Great Pyramids in Egypt were built.  The Jewel Box, pictured above, spans about 20 light-years, and can be seen with binoculars towards the southern constellation of the cross (Crux).",
            media_type: "image",
            title: "NGC 4755: A Jewel Box of Stars",
            url: "https://apod.nasa.gov/apod/image/1008/jewelbox_willasch.jpg"
        }]
    }
}
const reducer = produce((state, action) => {
    switch (action.type) {
        case 'SET_USER_DETAILS': {
            console.log(action.payload)
            state.user = action.payload;
            console.log(state.user)
            break;
        }
        case 'SET_USER_NAME': {
            state.user.userName = action.payload;
            break;
        }
        case 'SET_PASSWORD': {
            state.user.password = action.payload;
            break;
        }
        case 'SET_EMAIL': {
            state.user.email = action.payload;
            break;
        }
        case 'SET_NASA_IMAGE': {
            if (action.payload.url == '')
                break;
            let image = null;
            state.user.nasaImages.forEach(i => {
                if (i.url == action.payload.url)
                    image = action.payload;
            })
            if (image == null)
                state.user.nasaImages.push(action.payload);
            break;
        }
        case 'REMOVE_NASA_IMAGE': {
            // let images = state.user.nasaImages;
            for (var i = 0; i < state.user.nasaImages.length; i++) {
                console.log(state.user.nasaImages[i])
                if (state.user.nasaImages[i].url == action.payload.url)
                    state.user.nasaImages.splice(i, 1)
                // state.user.nasaImages.splice(action.payload)
            }
            break;
        }
    }
}, initialState);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers());

window.store = store;
export default store;