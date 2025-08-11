describe("Pizza Uygulaması E2E", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("Home: hero başlığı görünür ve orta kart tıklanınca order sayfasına gider", () => {
    cy.get(".hero-title").should("contain", "KOD ACIKTIRIR");


    cy.get('a.card').contains("Position Absolute Acı Pizza").click();
    cy.url().should("include", "/order-pizza");
  });

  it("Order: en az 4 malzeme kuralı; 3 seçiliyken disabled, 4. ile enabled", () => {
    cy.visit("http://localhost:5173/order-pizza");


    cy.contains(".radio-chip", "Küçük").click();
    cy.get("#hamur").select("Normal");


    cy.get('input[type="checkbox"]').eq(0).check({ force: true });
    cy.get('input[type="checkbox"]').eq(1).check({ force: true });
    cy.get('input[type="checkbox"]').eq(2).check({ force: true });

    cy.get('button[type="submit"]').should("be.disabled");

    cy.get('input[type="checkbox"]').eq(3).check({ force: true });
    cy.get('button[type="submit"]').should("not.be.disabled");
  });

  it("Order → Success: form gönderilince success sayfasına gider ve özet görünür", () => {

    cy.intercept("POST", "https://reqres.in/api/pizza", {
      statusCode: 201,
      body: { id: 1 },
    }).as("postPizza");

    cy.visit("http://localhost:5173/order-pizza");

 
    cy.contains(".radio-chip", "Büyük").click();
    cy.get("#hamur").select("Normal");


    cy.get('input[type="checkbox"]').eq(0).check({ force: true });
    cy.get('input[type="checkbox"]').eq(1).check({ force: true });
    cy.get('input[type="checkbox"]').eq(2).check({ force: true });
    cy.get('input[type="checkbox"]').eq(3).check({ force: true });


    cy.get('[id="özel"]').type("Bol malzeme olsun");

    cy.get('button[type="submit"]').click();

    cy.wait("@postPizza");
    cy.url().should("include", "/success");


    cy.get(".success-logo").should("be.visible");
    cy.get(".title").should("contain", "SİPARİŞ ALINDI");
    cy.get(".product").should("contain", "Position Absolute Acı Pizza");

    cy.get(".details").within(() => {
      cy.contains("Boyut:").parent().should("contain", "Büyük");
      cy.contains("Hamur:").parent().should("contain", "Normal");
      cy.contains("Adet:").parent().should("contain", "1");
    });

    cy.get(".summary").should("exist");
    cy.get(".summary .row").should("have.length.at.least", 2);

   
    cy.get(".home-link").should("contain", "Ana sayfa").click();
    cy.url().should("eq", "http://localhost:5173/");
  });
});
