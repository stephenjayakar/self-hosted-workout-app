.PHONY: watch
watch:
	cd frontend && npm run dev

.PHONY: sync
sync:
	cd frontend && npx convex push
