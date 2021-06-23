const searchResults = document.querySelector(".searchResults");
function searchForHotels() {
        
        const value = document.querySelector(".mr-sm-2").value;
        const search = value.charAt(0).toUpperCase() + value.slice(1);
        searchResults.innerHTML = "";
        var countFalses = 0;
        for (let i = 0; i < hotelsArray.length; i++) {

            if (hotelsArray[i].data.address.includes(search)) {
                const email = hotelsArray[i].data.email;
                const HotelName = hotelsArray[i].data.HotelName;
                const address = hotelsArray[i].data.address;
                const phone = hotelsArray[i].data.phone;
                const about = hotelsArray[i].data.about;
                const userCategory = hotelsArray[i].data.userCategory;


                searchResults.innerHTML += `
        <section class="hotelCard card" style="width: 37.7rem">
        <img src="${hotelsArray[i].data.profPicture[0]}" alt="...">
        <div class="card-body">
          <h5 class="card-title"><strong>${HotelName}</strong></h5>
          <p class="card-text"><strong>Email:</strong> ${email}</p>
          <p class="card-text"><strong>Phone:</strong> ${phone}</p>
          <h6>About hotel</h6>
          <p class="card-text" style="text-align:justify; width:300px">${about}</p>
          <p class="card-text"><strong>Adress:</strong> ${address}</p>
          <button type="button" class="btn btn-success" id="${hotelsArray[i].id}" onclick="getHotelrooms(this.id)">rooms</button>
        </div>
      </div>
      </section>`} else { countFalses++ }
            if (countFalses == hotelsArray.length) { console.log(countFalses); swal("no results!", "please try again!", "error") }
        }
    

}





        //  for (let j = 0; j < hotelsArray[i].data.picturesArr.length; j++) {
        //             adminCardsArea.innerHTML += `<section class="hotelCard card" style="width: -15rem; border: none;">
        //             <img src="${hotelsArray[i].data.picturesArr[j]}" alt="...">`
        //         }



