let cardSection = document.getElementById("cardSection");
let totalCount = document.getElementById("totalCount");

const allBtns = document.getElementById("allBtn");
const openBtns = document.getElementById("openBtn");
const closedBtns = document.getElementById("closedBtn");

let searchInput = document.getElementById("searchInput");
let modal_content = document.getElementById("modal_content")

let allIssues = [];
let openList = [];
let closeList = [];

searchInput.addEventListener("input", function () {
  const searchText = searchInput.value.toLowerCase();

  const filteredIssues = allIssues.filter((issue) =>
    issue.title.toLowerCase().includes(searchText),
  );

  loadDataDisplay(filteredIssues);
});

function buttonStyle(clicked) {
  console.log(clicked);
  allBtns.classList.remove("btn-primary");
  openBtns.classList.remove("btn-primary");
  closedBtns.classList.remove("btn-primary");

  document.getElementById(clicked).classList.add("btn-primary");

  if (clicked === "allBtn") {
    loadDataDisplay(allIssues);
  }

  if (clicked == "openBtn") {
    loadDataDisplay(openList);
  }

  if (clicked === "closedBtn") {
    loadDataDisplay(closeList);
  }
}

async function loadData() {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();

  allIssues = data.data;
  openList = allIssues.filter((item) => item.status === "open");
  closeList = allIssues.filter((item) => item.status === "closed");
  loadDataDisplay(allIssues);
}

function loadDataDisplay(dataResived) {
  cardSection.innerHTML = "";

  for (let text of dataResived) {
    let colors = text.status === "closed";
    let div = document.createElement("div");

    div.className = `p-5 rounded-md border-t-4 ${colors ? "border-[#A855F7]" : "border-green-600"} bg-white relative space-y-4`;

    div.innerHTML = `
      <div class="flex justify-between items-center">
        <img src=${colors ? "./assets/ClosedStatus.png" : "./assets/Open-Status.png"} alt="" class="${colors ? "bg-[#ebcbfa88]" : "bg-[#CBFADB]"} p-1 rounded-full">
        <h2 class=" uppercase ${colors ? "text-[#9CA3AF] bg-[#9CA3AF]/20" : "text-[#EF4444]"}  w-fit px-7 rounded-full">${text.priority}</h2>
      </div>
      <div>
        <h2 class="font-semibold">${text.title}</h2>
        <p class="text-[#64748B] line-clamp-2">${text.description}</p>
      </div>
      <div class="flex mb-7 flex-wrap gap-2">
        <p class="text-[#EF4444] bg-[#FEECEC] border-2 text-[11px] uppercase border-[#FECACA] px-5 py-1 rounded-full"><i class="fa-solid fa-bug"></i> Bug</p>
        <p class="bg-[#FFF8DB] text-[#D97706] border-2 text-[11px] uppercase border-[#FDE68A] px-5 py-1 rounded-full"><i class="fa-solid fa-life-ring"></i> help wanted</p>
      </div>
      <div class="w-full h-[2px] bg-[#E4E4E7] top-[65%] left-0"></div>
      <h5 class="text-[#64748B]">#${text.id} by ${text.author}</h5>
      <h6 class="text-[#64748B]">${text.createdAt}</h6>
    `;

    div.addEventListener("click", function () {
      openModal(text);
    });

    cardSection.appendChild(div);
  }

  totalCount.innerText = cardSection.children.length;
}

function openModal(res) {
  console.log(res)
  let colors = res.status === "closed";
 modal_content.innerHTML = ""
  
    let div = document.createElement("div");
  div.innerHTML = `
  <div  class="bg-white p-8 space-y-3">
        <h1 class="text-2xl font-semibold">${res.title}</h1>
        <div class="flex gap-4">
            <p class="px-4 text-[12px] rounded-full bg-green-600 text-white">Opened</p>
            <li class=" text-[12px]">${res.status} by ${res.author}</li>
            <li class=" text-[12px]">22/02/2026</li>
        </div>
        <div class="flex gap-3">
            <p class="text-[#EF4444] bg-[#FEECEC] border-2 text-[11px] uppercase border-[#FECACA] px-5 py-1 rounded-full"><i class="fa-solid fa-bug"></i> Bug</p>
                        <p class="bg-[#FFF8DB] text-[#D97706] border-2 text-[11px] uppercase border-[#FDE68A] px-5 py-1 rounded-full"><i class="fa-solid fa-life-ring"></i> help wanted</p>
        </div>
        <p>${res.description}</p>
        <div class="flex justify-between">
            <div>
                <h3 class="text-[#64748B]">Assignee:</h3>
                <h2>${res.author}</h2>
            </div>
            <div>
                <h3 class="text-[#64748B]">Priority:</h3>
                <h2 class="${colors ? "text-white bg-[#EF4444]" : "text-white bg-[#05a520]"}  w-fit px-7 rounded-full">${res.priority}</h2>
            </div>
        </div>
    </div>

  `;
  modal_content.appendChild(div)
  document.getElementById("my_modal_1").showModal()
 
  
}
loadData();
