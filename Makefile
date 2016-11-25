MODULE_PATH=node_modules
PATH:=$(MODULE_PATH)/.bin:$(PATH)

STANDARD=standard
JEST=jest

LINT=lint
TEST=test

all: $(LINT) $(TEST)

$(LINT): $(STANDARD)

$(TEST): $(JEST)

$(STANDARD):
	@$(STANDARD);

$(JEST):
	@$(JEST);

.PHONY: all \
	$(LINT) \
	$(JEST)
