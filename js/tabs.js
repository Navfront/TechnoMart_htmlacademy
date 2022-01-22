const servicesContent = document.querySelector(".services__content");

if (servicesContent) {
  const tabBtnsArray = servicesContent.querySelectorAll(
    ".services__menu li .tab-btn"
  );
  const tabItemsArray = servicesContent.querySelectorAll(".tabs__item");
  const currentTabClass = "tabs__current";
  const cuttentTabBtn = "tab-btn--current";
  const numberOfTabs = tabItemsArray.length;

  // function that remove current classes on all tabs/btns and add only on current[index]
  function setTab(index) {
    if (index < numberOfTabs) {
      tabItemsArray.forEach((element) => {
        element.classList.remove(currentTabClass);
      });
      tabBtnsArray.forEach((element) => {
        element.classList.remove(cuttentTabBtn);
      });
      tabItemsArray[index].classList.add(currentTabClass);
      tabBtnsArray[index].classList.add(cuttentTabBtn);
    }
  }

  // set eventListeners on buttons
  tabBtnsArray.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      setTab(index);
    });
  });
}
